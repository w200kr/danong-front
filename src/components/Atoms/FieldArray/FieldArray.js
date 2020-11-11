import React from "react";
import { useFieldArray } from "react-hook-form";

import Grid from '@material-ui/core/Grid';

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
