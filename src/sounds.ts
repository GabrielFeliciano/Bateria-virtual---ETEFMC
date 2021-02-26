import { MultipleSound } from "./type";

const url = (filename: string, extension: string): string => `/public/images/${filename}.${extension}`;

export const sounds: MultipleSound[] = [
    { 
        soundname: 'bumbo', 
        key: 'q', 
        charCode: null,
        optionalParam: {
            imageUrl: url('bumbo','jpg')
        }
    }, 
    { 
        soundname: 'caixa', 
        key: 'w', 
        charCode: null,
        optionalParam: {
            imageUrl: url('caixa','jpg')
        }
    },
    { 
        soundname: 'crash', 
        key: 'e', 
        charCode: null,
        optionalParam: {
            imageUrl: url('crash','jpg')
        }
    },
    { 
        soundname: 'crash2', 
        key: 'r', 
        charCode: null,
        optionalParam: {
            imageUrl: url('crash2','jpeg')
        }
    },
    { 
        soundname: 'hihat1', 
        key: 't', 
        charCode: null,
        optionalParam: {
            imageUrl: url('hihat','jpeg')
        }
    },
    { 
        soundname: 'ride', 
        key: 'y', 
        charCode: null,
        optionalParam: {
            imageUrl: url('ride','png')
        }
    },
    { 
        soundname: 'surdo', 
        key: 'u', 
        charCode: null,
        optionalParam: {
            imageUrl: url('surdo','jpg')
        }
    },
    { 
        soundname: 'tom1', 
        key: 'i', 
        charCode: null,
        optionalParam: {
            imageUrl: url('tom','jpg')
        }
    },
    { 
        soundname: 'tom2', 
        key: 'o', 
        charCode: null,
        optionalParam: {
            imageUrl: url('tom2','jpeg')
        }
    }
]