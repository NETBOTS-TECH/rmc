import * as React from "react"
import { Slot as SlotPrimitive } from "@radix-ui/react-slot"

type SlotProps = React.ComponentPropsWithoutRef<typeof SlotPrimitive>

const Slot = React.forwardRef<React.ElementRef<typeof SlotPrimitive>, SlotProps>(({ ...props }, ref) => (
  <SlotPrimitive ref={ref} {...props} />
))
Slot.displayName = SlotPrimitive.displayName

export { Slot }

