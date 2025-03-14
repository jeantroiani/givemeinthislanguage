 export enum LessonTypes {
    Time = 'Time',
    Cost = 'Cost',
  }

  export type Lesson = {
    title: string;
    description: string;
    image?: string;
  }

    export const lessons: { [key in LessonTypes]: Lesson } = {
        [LessonTypes.Time]: {
        title: LessonTypes.Time,
        description: 'Learn how to tell time in different languages',
        image: undefined,
        },
        [LessonTypes.Cost]: {
        title: LessonTypes.Cost,
        description: 'Learn how to say the price of things in different languages',
        image: undefined,
        },
    };