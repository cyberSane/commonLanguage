// var assert = require('assert');
// var Parser = require('jison').Parser;
// var grammer = require('fs').readFileSync('./source/jison/grammer.jison', 'utf-8');
//
// var parser = new Parser(grammer);
//
// describe('jison grammer', function () {
//     describe('toString', function () {
//         it('should return string of valid two number expression', function () {
//             var expression = '2+3';
//             var expected = '(2+3)';
//             assert.equal(parser.parse(expression).toString(), expected);
//         });
//
//         it('should return string of valid three number expression', function () {
//             var expression = '2+3-4';
//             var expected = '((2+3)-4)';
//             assert.equal(parser.parse(expression).toString(), expected);
//         });
//
//         it('should return string of valid expression with different operators', function () {
//             var expression = '2+3-4*5';
//             var expected = '((2+3)-(4*5))';
//             assert.equal(parser.parse(expression).toString(), expected);
//         });
//     });
//
//     describe('toWords', function () {
//         it('should return words representation of valid two number expression', function () {
//             var expression = '2+3';
//             var expected = '(two plus three)';
//             assert.equal(parser.parse(expression).toWords(), expected);
//         });
//
//         it('should return words representation of valid three number expression', function () {
//             var expression = '2+3-4';
//             var expected = '((two plus three) minus four)';
//             assert.equal(parser.parse(expression).toWords(), expected);
//         });
//
//         it('should return words representation of valid expression with different operators', function () {
//             var expression = '2+3-4*5';
//             var expected = '((two plus three) minus (four times five))';
//             assert.equal(parser.parse(expression).toWords(), expected);
//         });
//     });
//
//     describe('evaluate', function () {
//         it('should return value of evaluated two number expression', function () {
//             var expression = '2+3';
//             var expected = 5;
//             assert.equal(parser.parse(expression).evaluate(), expected);
//         });
//
//         it('should return value of evaluated three number expression', function () {
//             var expression = '2+3-4';
//             var expected = 1;
//             assert.equal(parser.parse(expression).evaluate(), expected);
//         });
//
//         it('should return value of evaluated expression with different operators', function () {
//             var expression = '2+3-4*5';
//             var expected = -15;
//             assert.equal(parser.parse(expression).evaluate(), expected);
//         });
//     });
// });
