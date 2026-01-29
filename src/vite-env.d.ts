/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Fix for react-icons type declarations
declare module 'react-icons/md' {
  import { FC, SVGProps } from 'react'
  export const MdEventNote: FC<SVGProps<SVGSVGElement>>
  export const MdLocationOn: FC<SVGProps<SVGSVGElement>>
  export const MdCheckroom: FC<SVGProps<SVGSVGElement>>
  export const MdMarkEmailRead: FC<SVGProps<SVGSVGElement>>
  export const MdPhotoCamera: FC<SVGProps<SVGSVGElement>>
  export const MdNavigation: FC<SVGProps<SVGSVGElement>>
  export const MdOpenInNew: FC<SVGProps<SVGSVGElement>>
  export const MdPeople: FC<SVGProps<SVGSVGElement>>
  export const MdPerson: FC<SVGProps<SVGSVGElement>>
  export const MdMessage: FC<SVGProps<SVGSVGElement>>
  export const MdCheckCircle: FC<SVGProps<SVGSVGElement>>
  export const MdSend: FC<SVGProps<SVGSVGElement>>
  export const MdImage: FC<SVGProps<SVGSVGElement>>
  export const MdClose: FC<SVGProps<SVGSVGElement>>
  export const MdMenu: FC<SVGProps<SVGSVGElement>>
  export const MdLightMode: FC<SVGProps<SVGSVGElement>>
  export const MdDarkMode: FC<SVGProps<SVGSVGElement>>
  export const MdLanguage: FC<SVGProps<SVGSVGElement>>
  export const MdRestaurant: FC<SVGProps<SVGSVGElement>>
  export const MdCelebration: FC<SVGProps<SVGSVGElement>>
  export const MdCameraAlt: FC<SVGProps<SVGSVGElement>>
  export const MdAccessTime: FC<SVGProps<SVGSVGElement>>
}
