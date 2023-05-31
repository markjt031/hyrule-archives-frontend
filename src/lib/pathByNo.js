/*This is a function to attach the correct route to 
hyrule compendium information, based on their numbers(the numbers are from in game)*/
export const pathByNumber=(no)=>{
    if (no>=1 && no<=52){
        return 'creatures/'
    }
    if (no>=53 && no<=92){
        return 'critters/'
    }
    if (no>=93 && no<=202){
        return 'monsters/'
    }
    if (no>=203 && no<=328){
        return 'items/materials/'
    }
    if (no>=329 && no<=503){
        return 'items/equipment/'
    }
}