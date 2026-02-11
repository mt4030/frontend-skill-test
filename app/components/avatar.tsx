import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Avatarprofil() {
  return (
    <Avatar>
      <AvatarImage
        src="https://github.com/shadcn.png"
        alt="@shadcn"
        className="grayscale"
      />
      <AvatarFallback>avatar</AvatarFallback>
    </Avatar>
  )
}
