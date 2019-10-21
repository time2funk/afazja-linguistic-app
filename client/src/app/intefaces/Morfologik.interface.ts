
export interface ParagraphInterface {
    sentences: SentenceInterface[];
};

enum endChar {'.', ';', '!', '?', ':', '...'};

export interface SentenceInterface {
    endChar?: endChar;
    position: number;
    secretLength: number;
    words: WordInterface[];
};

export interface WordInterface {
    text: string;
    type?: string;
    position: number;
    secret?: SecretInterface;
};

export interface SecretInterface {
    info?: string;
    imgs?: string[];
};