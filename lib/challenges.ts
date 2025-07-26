export interface Challenge {
  id: number
  title: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  instructions: string
  startingCode: string
  hints: string[]
  targetPositions?: Array<{ x: number; y: number }>
  checkSolution: (css: string) => boolean
  learningObjective: string
}

export const challenges: Challenge[] = [
  {
    id: 1,
    title: "Basic Row Layout",
    difficulty: "Beginner",
    instructions: "Make the cats line up side by side in a row",
    startingCode: ".flex-container {\n  display: flex;\n  /* Add your CSS here */\n}",
    hints: [
      "First, you need to make the container a flex container (already done!)",
      "Use the flex-direction property to control layout direction",
      "Try setting flex-direction to 'row'",
    ],
    targetPositions: [
      { x: 25, y: 50 },
      { x: 50, y: 50 },
      { x: 75, y: 50 },
    ],
    checkSolution: (css: string) => {
      return (
        css.includes("flex-direction: row") ||
        css.includes("flex-direction:row") ||
        (!css.includes("flex-direction") && css.includes("display: flex"))
      )
    },
    learningObjective: "Understanding flex-direction property",
  },
  {
    id: 2,
    title: "Vertical Stack",
    difficulty: "Beginner",
    instructions: "Stack the cats on top of each other",
    startingCode: ".flex-container {\n  display: flex;\n  /* Add your CSS here */\n}",
    hints: [
      "You need to change the direction from row to column",
      "Use flex-direction property",
      "Set flex-direction to 'column'",
    ],
    targetPositions: [
      { x: 50, y: 25 },
      { x: 50, y: 50 },
      { x: 50, y: 75 },
    ],
    checkSolution: (css: string) => {
      return css.includes("flex-direction: column") || css.includes("flex-direction:column")
    },
    learningObjective: "Column direction layout",
  },
  {
    id: 3,
    title: "Horizontal Centering",
    difficulty: "Beginner",
    instructions: "Move the cats to the horizontal center of their container",
    startingCode: ".flex-container {\n  display: flex;\n  /* Add your CSS here */\n}",
    hints: [
      "You need to center items along the main axis",
      "Use justify-content property for main axis alignment",
      "Set justify-content to 'center'",
    ],
    checkSolution: (css: string) => {
      return css.includes("justify-content: center") || css.includes("justify-content:center")
    },
    learningObjective: "Understanding justify-content for main axis alignment",
  },
  {
    id: 4,
    title: "Vertical Centering",
    difficulty: "Beginner",
    instructions: "Center the cats vertically in their container",
    startingCode: ".flex-container {\n  display: flex;\n  /* Add your CSS here */\n}",
    hints: [
      "You need to center items along the cross axis",
      "Use align-items property for cross axis alignment",
      "Set align-items to 'center'",
    ],
    checkSolution: (css: string) => {
      return css.includes("align-items: center") || css.includes("align-items:center")
    },
    learningObjective: "Understanding align-items for cross axis alignment",
  },
  {
    id: 5,
    title: "Reverse Row with Distribution",
    difficulty: "Intermediate",
    instructions: "Flip the cat order and spread them apart with equal spacing",
    startingCode: ".flex-container {\n  display: flex;\n  /* Add your CSS here */\n}",
    hints: [
      "You need to reverse the direction and add spacing",
      "Use flex-direction: row-reverse and justify-content for spacing",
      "Try justify-content: space-between",
    ],
    checkSolution: (css: string) => {
      return (
        (css.includes("flex-direction: row-reverse") || css.includes("flex-direction:row-reverse")) &&
        (css.includes("justify-content: space-between") || css.includes("justify-content:space-between"))
      )
    },
    learningObjective: "Combining direction and distribution properties",
  },
  {
    id: 6,
    title: "Column with Cross-Axis Alignment",
    difficulty: "Intermediate",
    instructions: "Stack the cats vertically and move them to the right edge",
    startingCode: ".flex-container {\n  display: flex;\n  /* Add your CSS here */\n}",
    hints: [
      "You need column direction and right alignment",
      "Use flex-direction: column and align-items for positioning",
      "Set align-items to 'flex-end'",
    ],
    checkSolution: (css: string) => {
      return (
        (css.includes("flex-direction: column") || css.includes("flex-direction:column")) &&
        (css.includes("align-items: flex-end") || css.includes("align-items:flex-end"))
      )
    },
    learningObjective: "Vertical layout with horizontal positioning",
  },
  {
    id: 7,
    title: "Perfect Center Alignment",
    difficulty: "Intermediate",
    instructions: "Center the cats perfectly in the middle of the container",
    startingCode: ".flex-container {\n  display: flex;\n  /* Add your CSS here */\n}",
    hints: [
      "You need to center on both axes",
      "Use justify-content: center for main axis",
      "Use align-items: center for cross axis",
    ],
    checkSolution: (css: string) => {
      return (
        (css.includes("justify-content: center") || css.includes("justify-content:center")) &&
        (css.includes("align-items: center") || css.includes("align-items:center"))
      )
    },
    learningObjective: "Simultaneous main and cross axis centering",
  },
  {
    id: 8,
    title: "Complex Reverse Layout",
    difficulty: "Advanced",
    instructions: "Create a reverse row with cats evenly distributed and aligned to the top",
    startingCode: ".flex-container {\n  display: flex;\n  /* Add your CSS here */\n}",
    hints: [
      "You need reverse direction, even distribution, and top alignment",
      "Use flex-direction: row-reverse, justify-content: space-evenly",
      "Add align-items: flex-start for top alignment",
    ],
    checkSolution: (css: string) => {
      return (
        (css.includes("flex-direction: row-reverse") || css.includes("flex-direction:row-reverse")) &&
        (css.includes("justify-content: space-evenly") || css.includes("justify-content:space-evenly")) &&
        (css.includes("align-items: flex-start") || css.includes("align-items:flex-start"))
      )
    },
    learningObjective: "Multiple property coordination",
  },
  {
    id: 9,
    title: "Master Challenge",
    difficulty: "Advanced",
    instructions: "Create the ultimate flex layout: reverse column, spaced apart, and centered",
    startingCode: ".flex-container {\n  display: flex;\n  /* Add your CSS here */\n}",
    hints: [
      "This combines all concepts: reverse column with spacing and centering",
      "Use flex-direction: column-reverse, justify-content: space-between",
      "Add align-items: center for horizontal centering",
    ],
    checkSolution: (css: string) => {
      return (
        (css.includes("flex-direction: column-reverse") || css.includes("flex-direction:column-reverse")) &&
        (css.includes("justify-content: space-between") || css.includes("justify-content:space-between")) &&
        (css.includes("align-items: center") || css.includes("align-items:center"))
      )
    },
    learningObjective: "All concepts combined in complex arrangement",
  },
]
