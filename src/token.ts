export type TokenType = string;

export type Token = {
  Type: TokenType;
  Literal: string;
};

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
  // if tok, ok := keywords[ident]; ok {
  // 	return tok
  // }
  return IDENT;
}
