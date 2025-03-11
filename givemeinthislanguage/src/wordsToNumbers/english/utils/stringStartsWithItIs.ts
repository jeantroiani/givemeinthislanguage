    export const stringStartsWithItIs = (words: string[]): boolean => {
        const firstWord = words[0]?.toLocaleLowerCase();
        const secondWord = words[1]?.toLocaleLowerCase();
        
        return firstWord === "it's" || (firstWord === 'it' && secondWord === 'is');
    };
