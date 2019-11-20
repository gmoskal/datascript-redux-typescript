import { createAction } from "./actions"

describe("utils", () => {
    describe("createAction()", () => {
        it("creates actions with no payload", () => expect(createAction("foo")).toEqual({ type: "foo" }))
        it("creates actions with payload", () => {
            expect(createAction("foo", "bar")).toEqual({ type: "foo", payload: "bar" })
            expect(createAction("foo", { name: "bar" })).toEqual({ type: "foo", payload: { name: "bar" } })
        })
    })
})
