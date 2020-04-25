export interface wordData{
    words: string[];
    // word can be appended after every type
    // mdi-file-word-box mdi-key-variant
    type: 'Programming'|'Buzz'|'Important'|'Technical'|'Language'|'Framework';
    language:'C'|'Java'|'JavaScript'|'Python'| null;
}