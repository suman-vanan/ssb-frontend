export interface RecipePreview {
    id: number
    name: string
    mainIngredients: string[]
    tags: string[]
}

interface SampleRecipe {
    id: number
    name: string
    mainIngredient: string
    description: string
    steps: string[]
}

const sampleRecipes: SampleRecipe[] = [
    {
        id: 1,
        name: 'Fish & Chips',
        mainIngredient: 'fish',
        description: 'Fish and chips is a hot dish consisting of fried fish in batter, served with chips.',
        steps: ['Slice fish.']
    },
    {
        id: 2,
        name: 'Chicken Chop',
        mainIngredient: 'chicken',
        description: 'Delicious grilled or pan-fried marinated chicken covered in a rich, bold black pepper sauce.',
        steps: ['Cut chicken.']
    },
    {
        id: 3,
        name: 'Fish Soup',
        mainIngredient: 'fish',
        description: 'Fish soup is a food made by combining fish or seafood with vegetables and stock, juice, water, or another liquid.',
        steps: ['Slice fish.']
    },
    {
        id: 4,
        name: 'Korean BBQ Saba Fish',
        mainIngredient: 'fish',
        description: 'Godeungeo gui (고등어 구아) is a grilled mackerel dish. Grilled fish is enormously popular in Korean cuisine. The fish is simply salted and either grilled over an open flame or pan fried',
        steps: ['Slice fish.']
    },
]