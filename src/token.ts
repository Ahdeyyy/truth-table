export type TokenType = string;

export type Token = {
  Type: TokenType;
  Literal: string;
};

let keywords: Map<string,string> = new Map();

export const ILLEGAL = "ILLEGAL",
  EOF = "EOF",
  // IDENTIFIERS
  IDENT = "IDENT",
  // OPERATORS
  OR = "∨",
  AND = "∧",
  IMPL = "→", // IMPLIES
  IFF = "↔", // IF AND ONLY IF
  NOT = "¬",
  LPAREN = "(",
  RPAREN = ")";

export function LookupIdent(ident: string): TokenType {
  let tok = keywords.get(ident);
  if (tok) {
  	return tok
  }
  return IDENT;
}
