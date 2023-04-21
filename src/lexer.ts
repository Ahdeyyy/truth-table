import { Token, OR, AND, LPAREN, RPAREN, IMPL, IFF, NOT, EOF, ILLEGAL, LookupIdent, TokenType } from "./token"

type Lexer = {
	input  :      string
	position :     number  // current position in input (points to current char)
	readPosition : number  // current reading position in input (after current char)
	ch        :   string// current char under examination
    readChar: Function
    skipWhitespace: Function
    readIdentifier: Function
    nextToken: Function
}


export function NewLexer(input: string) :Lexer {
	let l: Lexer = {
        input: input,
        ch: '',
        readPosition: 0,
        position: 0,
        readChar: readChar,
        skipWhitespace: skipWhitespace,
        readIdentifier: readIdentifier,
        nextToken: NextToken
    
    }
	l.readChar()
	return l

}

function readChar(this: Lexer) {
	if (this.readPosition >= this.input.length) {
		this.ch = '\0'
	} else {
		this.ch = this.input[this.readPosition]
	}
	this.position = this.readPosition

	this.readPosition += 1
}



function NextToken(this: Lexer) :Token {
	let tok :Token = {Type:'',Literal:''};
	this.skipWhitespace()

	switch (this.ch) {
	case '∨':
		tok = newToken(OR, this.ch)
        break;
	case '∧':
		tok = newToken(AND, this.ch)
        break;
	case '(':
		tok = newToken(LPAREN, this.ch)
        break;
	case ')':
		tok = newToken(RPAREN, this.ch)
        break;
	case '→':
		tok = newToken(IMPL, this.ch)
        break;
	case '↔':
		tok = newToken(IFF, this.ch)
        break;
	case '¬':
		tok = newToken(NOT, this.ch)
        break;
	case '\0':
		tok.Literal = ""
		tok.Type = EOF
        break;
	default:
		if (isLetter(this.ch)) {
			tok.Literal = this.readIdentifier()
			tok.Type = LookupIdent(tok.Literal)
			return tok
		} else {
			tok = newToken(ILLEGAL, this.ch)
		}
	}
	this.readChar()
	return tok
}

function newToken(tokenType :TokenType, ch: string) :Token {
	return {Type: tokenType, Literal: ch}
}

function  readIdentifier(this: Lexer) :string {
	let position = this.position
	while (isLetter(this.ch)) {
		this.readChar()
	}
	return this.input.slice(position,this.position)
}

function isLetter(ch : string) :boolean {
	return 'a' <= ch && ch <= 'z' || 'A' <= ch && ch <= 'Z' || ch == '_'
}

function skipWhitespace(this: Lexer) {
	while ( this.ch === ' ' || this.ch === '\t' || this.ch === '\n' || this.ch === '\r' ) {
		this.readChar();
	}
}

function peekChar(this: Lexer) :string {
	if (this.readPosition >= this.input.length) {
		return '\0'
	} else {
		return this.input[this.readPosition]
	}
}