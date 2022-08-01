
export default function notNull(value: any, substitute: any){
    return value ? value : substitute;
}