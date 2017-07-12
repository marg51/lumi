const match = require("./match")

describe("match", () => {
    it("should validate simple case", () => expect(match(1, 1)).toBe(true))
    it("should validate matching object", () =>
        expect(match({ a: 1 }, { a: 1 })).toBe(true))
    it("should validate containing object", () =>
        expect(match({ a: 1, yo: 1 }, { a: 1 })).toBe(true))
    it("should fails if not containing object", () =>
        expect(match({ a: 1 }, { a: 1, yo: 1 })).toBe(false))
    it("should validate containing array", () =>
        expect(match({ a: [1] }, { a: [1] })).toBe(true))
    it("should validate containing array regex", () =>
        expect(match({ a: ["haha", "b"] }, { a: [/a/, "b"] })).toBe(true))
    it("should fail containing array", () =>
        expect(match({ a: [1] }, { a: [1, 2] })).toBe(false))
    it("should fail containing array #2", () =>
        expect(match({ a: [1, 3] }, { a: [1, 2] })).toBe(false))

    it("should validate containing regex", () =>
        expect(match({ a: "haha" }, { a: /a/ })).toBe(true))

    it("should validate containing special syntax $in", () =>
        expect(match({ a: "haha" }, { a: { $in: ["eh", "haha"] } })).toBe(true))

    it("should fail containing special syntax $in", () =>
        expect(match({ a: "not" }, { a: { $in: ["eh", "haha"] } })).toBe(false))
    it("should validate containing special syntax $in with regex", () =>
        expect(match({ a: "blaeha" }, { a: { $in: [/eh/, "haha"] } })).toBe(true))

    it("should validate containing special syntax $exclude", () =>
        expect(match({ a: "haha" }, { a: { $exclude: ["eh", "haha"] } })).toBe(
            false
        ))

    it("should fail containing special syntax $exclude", () =>
        expect(match({ a: "not" }, { a: { $exclude: ["eh", "haha"] } })).toBe(
            true
        ))

    it("should validate containing special syntax $contains", () =>
        expect(match({ a: ["bebe", "haha"] }, { a: { $contains: ["haha"] } })).toBe(
            true
        ))

    it("should validate containing special syntax $contains with regex", () =>
        expect(match({ a: ["bebe", "haha"] }, { a: { $contains: [/a/] } })).toBe(
            true
        ))
    it("should validate $defined", () =>
        expect(match({ a: "1" }, { a: { $defined: true } })).toBe(
            true
        ))
    it("should fail $defined", () =>
        expect(match({ a: "1" }, { b: { $defined: true } })).toBe(
            false
        ))
})
