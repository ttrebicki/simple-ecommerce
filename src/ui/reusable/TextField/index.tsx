"use client";

import React, { forwardRef } from "react";
import clsx from "clsx";
import { TextFieldProps } from "./types";

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      id,
      className,
      description,
      error,
      required = false,
      disabled,
      ...inputProps
    },
    ref
  ) => {
    const inputId = id || `textfield-${Math.random().toString(36).slice(2, 8)}`;

    return (
      <div
        className={`flex flex-col ${disabled ? "opacity-50" : ""} ${className}`}
      >
        <label htmlFor={inputId} className="text-shadow-xs text-text">
          {label}
          {required && (
            <span aria-hidden className="text-red-500">
              {" "}
              *
            </span>
          )}
        </label>

        <input
          disabled={disabled}
          id={inputId}
          ref={ref}
          {...inputProps}
          required={required}
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${inputId}-error`
              : description
              ? `${inputId}-desc`
              : undefined
          }
          className={clsx(
            "w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500",
            error
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 focus:border-blue-500",
            className
          )}
        />

        {description && !error && (
          <p id={`${inputId}-desc`} className="text-sm text-gray-500">
            {description}
          </p>
        )}

        {error && (
          <p
            id={`${inputId}-error`}
            role="alert"
            className="text-[10px] text-red-600"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";
