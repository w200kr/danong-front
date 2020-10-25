import React from "react";
import { useFieldArray } from "react-hook-form";

// import Input from "./components/input";

import Grid from '@material-ui/core/Grid';
// import InputAdornment from "@material-ui/core/InputAdornment";

// import Button from "components/CustomButtons/Button.js";

// import FormInput from 'components/Atoms/FormInput/FormInput.js'


export default ({ parentName, parentIndex, childName, childFields, childButtons, control }) => {
  const name = `${parentName}[${parentIndex}].${childName}`
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
      <Grid container spacing={1}>
        {fields.map((row, childIndex) => {
          return (
            <Grid container item spacing={2} key={row.id}>
              {childFields.map((field, index)=>{
                return (
                  <Grid item {...field.gridProps} key={index}>
                    {
                      field.render({
                        length: fields.length,
                        parentIndex, childIndex, remove, append, row, 
                      })
                    }
                  </Grid>
                );
              })}
            </Grid>
          );
        })}

        <Grid container item justify='flex-end' spacing={1}>
          {
            childButtons.map((button, index)=>
              <Grid item key={index}>
                {button.render({
                  length: fields.length,
                  append, parentIndex
                })}
              </Grid>
            ) 
          }
        </Grid>
      </Grid>
  );
};
