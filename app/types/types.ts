type User = {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
} | undefined

type Err = {
    message? : string| null;
}| undefined


export type { User , Err}