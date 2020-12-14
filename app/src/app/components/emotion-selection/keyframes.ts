import { keyframes, style } from "@angular/animations";

export const slideInLeft = [
    style({ transform: 'translate3d(-330px,0px,0px)' }),
    style({ transform: 'translate3d(0,0,0)' }),

]


export const slideInRight = [
    style({ transform: 'translate3d(100%,0,0)' }),
    style({ transform: 'translate3d(0,0,0)' }),

]



export const slideOutLeft = [
    style({ transform: 'translate3d(0,0,0)' }),
    style({ transform: 'translate3d(-330px,0px,0px)' })

]


export const slideOutRight = [
    style({ transform: 'translate3d(0,0,0)' }),
    style({ transform: 'translate3d(100%,0,0)' })

]