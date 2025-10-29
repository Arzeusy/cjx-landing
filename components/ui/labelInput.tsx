"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export interface LabeledInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  labelClassName?: string
  containerClassName?: string
}

export const LabeledInput = React.forwardRef<HTMLInputElement, LabeledInputProps>(
  ({ label, id, className, labelClassName, containerClassName, ...props }, ref) => {
    const inputId = id || React.useId()

    return (
      <div className={containerClassName ?? "flex flex-col space-y-1"}>
        {label && (
          <Label htmlFor={inputId} className={labelClassName}>
            {label}
          </Label>
        )}
        <Input id={inputId} ref={ref} className={className} {...props} />
      </div>
    )
  }
)

LabeledInput.displayName = "LabeledInput"
