import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';
import { getChildren, getProviders, addNewProvider } from './services';
import { mockProviders, mockChildren } from '../mock-data';
import addChildminder from './form-fields/add-childminder';
import { isAbove18TextWarning } from './form-fields/validation-helpers';

jest.mock('./services');

beforeEach(() => {
  jest.clearAllMocks();
});

test('should show error text if either children or providers endpoints fails', async () => {
  getProviders.mockImplementation(() => Promise.reject());
  render(<App />);
  const errorText = await screen.findByText(
    'Ooo! Looks like something went wrong 🤕! Try refresh or try again a little later',
  );
  expect(errorText).toBeDefined();
});
test('should be able to view of all providers and can sort them by name', async () => {
  getChildren.mockImplementation(() => mockChildren);
  getProviders.mockImplementation(() => mockProviders);
  render(<App />);
  await screen.findByTestId('dashboard-layout');
  const listedMinders = screen.getAllByTestId('list-id');
  expect(listedMinders.length).toBe(39);
  const [firstChildMinder] = listedMinders;
  expect(within(firstChildMinder).getByText('Bernadette Collum')).toBeDefined();
  const nameSelectContainer = within(
    screen.getAllByTestId('select-id')[1],
  ).getByRole('button');
  fireEvent.mouseDown(nameSelectContainer);
  fireEvent.click(screen.getByText('A to Z'));
  const [firstSortedListedMinders] = screen.getAllByTestId('list-id');
  expect(
    within(firstSortedListedMinders).getByText('Abbey Trethowan'),
  ).toBeDefined();

  // see details
  fireEvent.click(screen.getAllByTestId('profile-id')[0]);
  const withOverlay = within(screen.getByTestId('dashboard-id'));
  expect(withOverlay.getByText('Abbey Trethowan')).toBeDefined();
  expect(withOverlay.getByText('atrethowanj@mailinator.com')).toBeDefined();
  expect(withOverlay.getByText('5913 Packers Place')).toBeDefined();
  expect(withOverlay.getByText('E0E 9OZ')).toBeDefined();
  expect(withOverlay.getByText('Bački Breg')).toBeDefined();
  expect(withOverlay.getByText('50 years old')).toBeDefined();
  expect(withOverlay.getByText('26-11-2019')).toBeDefined();
});

test('should be able to filter and find the childminders that have no active enrollments', async () => {
  getChildren.mockImplementation(() => mockChildren);
  getProviders.mockImplementation(() => mockProviders);
  render(<App />);
  await screen.findByTestId('dashboard-layout');
  const listedMinders = screen.getAllByTestId('list-id');
  expect(listedMinders.length).toBe(39);
  const [firstChildMinder] = listedMinders;
  expect(within(firstChildMinder).getByText('Bernadette Collum')).toBeDefined();
  expect(within(firstChildMinder).getByText('Enrollments: 2')).toBeDefined();

  // without enrollment
  const withoutEnrollmentSelectContainer = within(
    screen.getAllByTestId('select-id')[0],
  ).getByRole('button');
  fireEvent.mouseDown(withoutEnrollmentSelectContainer);
  fireEvent.click(screen.getByText('Without enrollments'));
  const [firstSortedListedMinders] = screen.getAllByTestId('list-id');
  expect(
    within(firstSortedListedMinders).getByText('Koralle Grigorio'),
  ).toBeDefined();
  expect(screen.getAllByText('No enrollments').length).toBe(10);

  screen
    .getAllByTestId('child-icon-id')
    .forEach((childIcon) =>
      expect(childIcon.hasAttribute('disabled')).toBeDefined(),
    );

  // with enrollment
  const withEnrollmentSelectContainer = within(
    screen.getAllByTestId('select-id')[0],
  ).getByRole('button');
  fireEvent.mouseDown(withEnrollmentSelectContainer);
  fireEvent.click(screen.getByText('With enrollments'));
  expect(screen.queryByText('No enrollments')).toBeNull();
  expect(screen.getAllByTestId('list-id').length).toBe(29);
  screen
    .getAllByTestId('child-icon-id')
    .forEach((childIcon) =>
      expect(childIcon.hasAttribute('disabled')).toBeFalsy(),
    );
});

test('should be able to filter and find the childminders with active enrollments - despite no student name', async () => {
  getChildren.mockImplementation(() => mockChildren);
  getProviders.mockImplementation(() => mockProviders);
  render(<App />);
  const getLindsay = mockProviders.findIndex(
    (minder) => minder.name === 'Lindsay Shama',
  );
  await screen.findByTestId('dashboard-layout');
  const minderWithMissingChildInfo = screen.getAllByTestId('list-id')[
    getLindsay
  ];

  fireEvent.click(
    within(minderWithMissingChildInfo).getByTestId('child-icon-id'),
  );

  expect(
    within(minderWithMissingChildInfo).getByText('Lindsay Shama'),
  ).toBeDefined();
  expect(screen.getAllByText("Issue getting student's name 😬!").length).toBe(
    3,
  );
});

test('should be able to view the details of a given enrollment', async () => {
  getChildren.mockImplementation(() => mockChildren);
  getProviders.mockImplementation(() => mockProviders);
  render(<App />);
  await screen.findByTestId('dashboard-layout');

  // with enrollment
  const withEnrollmentSelectContainer = within(
    screen.getAllByTestId('select-id')[0],
  ).getByRole('button');
  fireEvent.mouseDown(withEnrollmentSelectContainer);
  fireEvent.click(screen.getByText('With enrollments'));
  // all have enrollments
  fireEvent.click(screen.getAllByTestId('child-icon-id')[0]);
  //  child1
  expect(screen.getByText('Rennie Floweth (Child)')).toBeDefined();
  expect(screen.getByText('Start date: 16-07-2019')).toBeDefined();
  //  guardian
  expect(screen.getByText('Nevsa Buff (Guardian)')).toBeDefined();
  expect(screen.getByText('nbuff0@ibm.com')).toBeDefined();

  //  child2
  expect(screen.getByText('Ronny Pursglove (Child)')).toBeDefined();
  expect(screen.getByText('Start date: 23-06-2019')).toBeDefined();
  //  guardian
  expect(screen.getByText('Keary Chaudhry (Guardian)')).toBeDefined();
  expect(screen.getByText('kchaudhry0@tmall.com')).toBeDefined();
});
test('should be able to add a new childminder - (with success alert)', async () => {
  getChildren.mockImplementation(() => mockChildren);
  getProviders.mockImplementation(() => mockProviders);
  render(<App />);
  await screen.findByTestId('dashboard-layout');

  const firstName = addChildminder[0];
  const lastName = addChildminder[1];
  const email = addChildminder[2];
  const dob = addChildminder[3];

  const addMinderBtn = await screen.getByTestId('fab-id');
  fireEvent.click(addMinderBtn);
  const firstNameLabel = screen.getByLabelText(firstName.label);
  // errorhandling
  await act(async () => {
    fireEvent.change(firstNameLabel, { target: { value: 'A' } });
  });
  expect(screen.getByText(firstName.rules.minLength.message)).toBeDefined();
  await act(async () => {
    fireEvent.change(firstNameLabel, { target: { value: 'Akram' } });
  });
  expect(
    screen.getByTestId('submitForm').hasAttribute('disabled'),
  ).toBeTruthy();
  const lastNameLabel = screen.getByLabelText(lastName.label);
  // errorhandling
  await act(async () => {
    fireEvent.change(lastNameLabel, { target: { value: 'R' } });
  });
  expect(screen.getByText(lastName.rules.minLength.message)).toBeDefined();
  await act(async () => {
    fireEvent.change(lastNameLabel, { target: { value: 'Rasikh' } });
  });
  expect(
    screen.getByTestId('submitForm').hasAttribute('disabled'),
  ).toBeTruthy();
  const emailLabel = screen.getByLabelText(email.label);
  // errorhandling
  await act(async () => {
    fireEvent.change(emailLabel, { target: { value: '@a.com' } });
  });
  expect(screen.getByText(email.pattern.message)).toBeDefined();
  await act(async () => {
    fireEvent.change(emailLabel, { target: { value: 'a@mail.com' } });
  });
  expect(
    screen.getByTestId('submitForm').hasAttribute('disabled'),
  ).toBeTruthy();
  const dobLabel = screen.getByLabelText(dob.label);
  // errorhandling
  await act(async () => {
    fireEvent.change(dobLabel, { target: { value: '2005-01-01' } });
  });

  expect(screen.getByText(isAbove18TextWarning)).toBeDefined();
  await act(async () => {
    fireEvent.change(dobLabel, { target: { value: '1990-01-01' } });
  });
  expect(screen.getByTestId('submitForm').hasAttribute('disabled')).toBeFalsy();
  fireEvent.click(screen.getByTestId('submitForm'));

  addNewProvider.mockImplementation(() => Promise.resolve());

  await waitFor(() => expect(screen.getByText('Akram Rasikh')).toBeDefined());
  expect(screen.getByText('Hooray! new Joiner!')).toBeDefined();
});

test('should show error if form submission fails - (with error alert)', async () => {
  getChildren.mockImplementation(() => mockChildren);
  getProviders.mockImplementation(() => mockProviders);
  render(<App />);
  await screen.findByTestId('dashboard-layout');

  const firstName = addChildminder[0];
  const lastName = addChildminder[1];
  const email = addChildminder[2];
  const dob = addChildminder[3];

  const addMinderBtn = await screen.getByTestId('fab-id');
  fireEvent.click(addMinderBtn);
  const firstNameLabel = screen.getByLabelText(firstName.label);
  await act(async () => {
    fireEvent.change(firstNameLabel, { target: { value: 'Akram' } });
  });

  const lastNameLabel = screen.getByLabelText(lastName.label);
  await act(async () => {
    fireEvent.change(lastNameLabel, { target: { value: 'R' } });
  });
  expect(screen.getByText(lastName.rules.minLength.message)).toBeDefined();
  await act(async () => {
    fireEvent.change(lastNameLabel, { target: { value: 'Rasikh' } });
  });
  const emailLabel = screen.getByLabelText(email.label);
  await act(async () => {
    fireEvent.change(emailLabel, { target: { value: 'a@mail.com' } });
  });
  const dobLabel = screen.getByLabelText(dob.label);
  await act(async () => {
    fireEvent.change(dobLabel, { target: { value: '1990-01-01' } });
  });
  fireEvent.click(screen.getByTestId('submitForm'));

  addNewProvider.mockImplementation(() => Promise.reject());

  await waitFor(() =>
    expect(
      screen.getByText('Oops! Problem occurred adding user'),
    ).toBeDefined(),
  );
});
