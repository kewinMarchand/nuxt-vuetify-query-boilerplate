export declare namespace Carousel {
  interface ImageSource {
    type: string
    srcset: string
  }

  interface Slide {
    id: string
    title: string
    text: string
    image: {
      src: string
      sources: ImageSource[]
      width: number
      height: number
    }
  }
}
