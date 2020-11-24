import React from "react";
import { useFieldArray } from "react-hook-form";

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import NestedArray from "components/Atoms/NestedFieldArray/NestedFieldArray.js";

export default (props) => {
  const { parentName, parentFields, defaultParent, childName, childFields, childButtons, control, handleReset, appendButton=true, clearButton=true, ...rest } = props;
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: parentName, // unique name for your Field Array
    // keyName: "id", default to "id", you can change the key name
  });

  const handleParent = {
    appendParent: ()=>{
      append(defaultParent || {})
    },
    removeParent: index => ()=>{
      remove(index)
    },
    clearParents: handleReset,
  }

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

              <Grid item key={parentIndex}>
                <IconButton color="secondary" onClick={handleParent.removeParent(parentIndex)} aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </Grid>
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
          (appendButton)?(
            <Grid item>
              <Button color="default" size="large" variant='outlined' onClick={handleParent.appendParent}>
                추가
              </Button>
            </Grid>):''
        }
        {
          (clearButton)?(
            <Grid item>
              <Button color="secondary" size="large" variant='outlined' onClick={handleParent.clearParents}>
                초기화
              </Button>
            </Grid>):''
        }
      </Grid>
    </Grid>
  );
};
