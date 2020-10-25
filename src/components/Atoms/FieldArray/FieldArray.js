import React from "react";
import { useFieldArray } from "react-hook-form";

// import Input from "./components/input";

import Grid from '@material-ui/core/Grid';


// import IconButton from '@material-ui/core/IconButton';
// import AddCircleIcon from '@material-ui/icons/AddCircle';
// import DeleteIcon from '@material-ui/icons/Delete';

// import Button from "components/CustomButtons/Button.js";

// import FormInput from 'components/Atoms/FormInput/FormInput.js'

import NestedArray from "components/Atoms/NestedFieldArray/NestedFieldArray.js";

export default ({ parentName, parentFields, parentButtons, childName, childFields, childButtons, control, ...rest }) => {
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: parentName, // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  });

  return (
    <Grid container spacing={1}>
      {
        fields.map((row, parentIndex)=>
          <Grid container item spacing={1} key={row.id}>
            <Grid container item spacing={1}>
              {parentFields.map((field, index)=>{
                return (
                  <Grid item {...field.gridProps} key={index}>

                    {
                      field.render({
                        parentIndex, remove, row
                      })
                    }
                  </Grid>
                );
              })}
            </Grid>

            {(childName)?(
              <NestedArray
                {...{ parentName, parentIndex, childName, childFields, childButtons, control }}
                // {...rest}
              />
            ):''}
            
          </Grid>
        )
      }

      <Grid container item justify='flex-end' spacing={1}>
        {
          parentButtons.map((button, index)=>
            <Grid item key={index}>
              {button.render({
                append
              })}
            </Grid>
          ) 
        }
      </Grid>
    </Grid>
  );
};
