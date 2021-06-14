import {MovieDetailProps} from "app/pages/MovieDetail/slice/types"
import React from "react"

export const useFieldTouch = () => {
  const handleFieldChange = React.useCallback((prevValue: MovieDetailProps,currentValue: any) => {
    const isSubmit = false

    for(let key in prevValue){

    }

    return isSubmit
  },[])

  return {handleFieldChange}
}
