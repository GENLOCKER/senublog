"use client"

import {
   Input,
   InputProps,
   Radio,
   RadioGroup,
   RadioGroupProps,
   Select,
   SelectItem,
   SelectProps,
   TextAreaProps,
   Textarea,
} from "@heroui/react"
import { FiEye, FiEyeOff } from "react-icons/fi"

import React from "react"

import Image from "next/image"

type TextInputProps = InputProps & { label: string }

export const TextInput: React.FC<TextInputProps> = ({ ...props }) => {
   return (
      <Input
         {...props}
         classNames={{
            input: "placeholder:text-[#718096]",
            innerWrapper: "bg-transparent",
            inputWrapper:
               "border border-[#CBD5E0] group-data-[focus=true]:outline-primary bg-[#F9FAFB] group-data-[hover=true]:bg-[#F9FAFB] group-data-[has-value=true]:bg-[#F9FAFB] group-data-[focus=true]:bg-[#F9FAFB]",
         }}
      />
   )
}

export const SearchInput: React.FC<InputProps> = ({ ...props }) => {
   return (
      <Input
         {...props}
         isClearable
         classNames={{
            base: "md:min-w-[300px]",
            input: "focus:outline-none placeholder:text-xs placeholder:text-[#718096] text-sm",
            innerWrapper: "bg-transparent",
            inputWrapper:
               "border border-[#EAECF0] rounded-lg py-2 px-4 w-full bg-white group-data-[hover=true]:bg-white group-data-[focus=true]:bg-white group-data-[focus=true]:outline-primary",
         }}
         placeholder={props.placeholder || "Search..."}
         startContent={
            props.startContent || <Image src="/svg/search-icon.svg" alt="Search Icon" width={20} height={20} />
         }
      />
   )
}

type TextAreaInputProps = TextAreaProps & { label: string }

export const TextAreaInput: React.FC<TextAreaInputProps> = ({ ...props }) => {
   return (
      <Textarea
         {...props}
         classNames={{
            innerWrapper: "bg-transparent",
            inputWrapper:
               "border border-[#CBD5E0] group-data-[focus=true]:outline-primary bg-[#F9FAFB] group-data-[hover=true]:bg-[#F9FAFB] group-data-[has-value=true]:bg-[#F9FAFB] group-data-[focus=true]:bg-[#F9FAFB]",
         }}
      />
   )
}

type RadioInputProps = RadioGroupProps & { label: string; options: { label: string; value: string }[] }

export const RadioInput: React.FC<RadioInputProps> = ({ ...props }) => {
   return (
      <RadioGroup {...props} orientation="horizontal" classNames={{ label: "text-sm text-[#344054] mb-1" }}>
         {props.options.map((option) => (
            <Radio key={option.value} value={option.value} classNames={{ label: "text-sm text-[#646A6A]" }}>
               {option.label}
            </Radio>
         ))}
      </RadioGroup>
   )
}

type SelectInputProps = Omit<SelectProps, "children"> & {
   options: { label: string; value: number | string; container?: boolean }[]
}

export const SelectInput: React.FC<SelectInputProps> = ({ ...props }) => {
   return (
      <Select
         {...props}
         variant="flat"
         className="w-full"
         aria-label="Select"
         classNames={{
            trigger: `rounded-xl border border-[#CBD5E0] data-[focus-visible=true]:outline-primary bg-[#F9FAFB] group-data-[hover=true]:bg-[#F9FAFB] group-data-[has-value=true]:bg-[#F9FAFB] group-data-[focus=true]:bg-[#F9FAFB]`,
         }}
         disallowEmptySelection
      >
         {props.options?.map((item: any) => <SelectItem key={item.value}>{item.label}</SelectItem>)}
      </Select>
   )
}

type FilterSelectProps = Omit<SelectProps, "children"> & {
   options: { label: string; key: string }[]
}

export const FilterSelect: React.FC<FilterSelectProps> = ({ ...props }) => {
   return (
      <Select
         {...props}
         variant="flat"
         className="w-full"
         aria-label="Select"
         classNames={{
            trigger:
               "rounded-xl bg-[#FAFAFA] border-[0.5px] group-data-[hover=true]:bg-[#FAFAFA] group-data-[has-value=true]:bg-[#FAFAFA] group-data-[focus=true]:bg-[#FAFAFA] data-[focus-visible=true]:outline-primary",
            value: "text-xs",
         }}
         disallowEmptySelection
      >
         {props.options?.map((item: any) => <SelectItem key={item.value || item.key}>{item.label}</SelectItem>)}
      </Select>
   )
}

//AUTHENTICATION INPUT FIELDS
type AuthInputProps = InputProps & {
   startContent: React.ReactNode
   placeholder: string
}

export const AuthTextInput: React.FC<AuthInputProps> = ({ ...props }) => {
   return (
      <Input
         {...props}
         classNames={{
            innerWrapper: "bg-transparent",
            inputWrapper:
               "h-12 bg-[#F9FAFB] group-data-[hover=true]:bg-[#F9FAFB] group-data-[focus=true]:bg-[#F9FAFB] group-data-[has-value=true]:bg-[#F9FAFB] border border-[#CBD5E0] group-data-[focus=true]:outline-primary",
            input: "ml-1 placeholder:text-[#718096]",
            errorMessage: "text-red-500",
         }}
      />
   )
}

export const PasswordInput: React.FC<AuthInputProps> = ({ ...props }) => {
   const [isVisible, setIsVisible] = React.useState(false)

   const togglePasswordVisibility = () => setIsVisible(!isVisible)
   return (
      <Input
         {...props}
         type={isVisible ? "text" : "password"}
         classNames={{
            innerWrapper: "bg-transparent",
            inputWrapper:
               "h-12 bg-[#F9FAFB] group-data-[hover=true]:bg-[#F9FAFB] group-data-[focus=true]:bg-[#F9FAFB] group-data-[has-value=true]:bg-[#F9FAFB] border border-[#CBD5E0] group-data-[focus=true]:outline-primary",
            input: "ml-1 placeholder:text-[#718096]",
         }}
         endContent={
            <button
               className="focus:outline-none"
               type="button"
               onClick={togglePasswordVisibility}
               aria-label="toggle password visibility"
            >
               {isVisible ? (
                  <FiEyeOff className="text-xl text-default-400 pointer-events-none" />
               ) : (
                  <FiEye className="text-xl text-default-400 pointer-events-none" />
               )}
            </button>
         }
      />
   )
}
