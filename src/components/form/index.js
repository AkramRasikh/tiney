import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { arrayOf, func, object } from 'prop-types';
import { useForm } from 'react-hook-form';
import FormButton from './form-button';
import InputError from './input-error';

const useStyles = makeStyles(() => ({
  root: {
    textAlign: 'center',
    padding: '0 10%',
  },
  inputClass: {
    minHeight: '70px',
  },
}));

const Form = ({ fields, submitData }) => {
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' });

  const onSubmit = (data) => {
    submitData(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={classes.root}
      data-testid='form'
    >
      {fields.map(
        ({
          InputComponent,
          name,
          label,
          required,
          rules,
          pattern,
          ...fieldProps
        }) => (
          <Grid key={name} className={classes.inputClass}>
            <InputComponent
              name={name}
              label={label}
              register={register(name, {
                required,
                pattern,
                ...rules,
              })}
              {...fieldProps}
            />
            {errors[name] && <InputError errorMessage={errors[name].message} />}
          </Grid>
        ),
      )}
      <FormButton disabled={!isValid}>Submit</FormButton>
    </form>
  );
};

Form.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  fields: arrayOf(object).isRequired,
  submitData: func.isRequired,
};

export default Form;
