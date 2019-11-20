import { getMapDispatch, getMapDispatch2 } from "./store"

describe("store utils", () => {
    describe("getMapDispatch()", () => {
        it("wraps object functions with `identity` dispatch", () => {
            const mapDispatch = getMapDispatch({ foo: () => 1 }, ["foo"])
            const dispatch = jest.fn()
            mapDispatch(dispatch, {}).foo()
            expect(dispatch).toBeCalledWith(1)
        })

        it("passes arguments through", () => {
            const mapDispatch = getMapDispatch({ foo: (a: number, b: number) => a + b }, ["foo"])
            const res = mapDispatch((v: any) => v, {})
            expect(res.foo(1, 2)).toEqual(3)
            const dispatch = jest.fn()
            mapDispatch(dispatch, {}).foo(1, 2)
            expect(dispatch).toBeCalledWith(3)
        })

        it("passes arguments through with two actions dicts", () => {
            const mapDispatch = getMapDispatch2(
                { foo: (a: number, b: number) => a + b },
                ["foo"],
                { bar: (a: number, b: number) => a * b },
                ["bar"]
            )
            const dispatch = jest.fn()
            mapDispatch(dispatch, {}).foo(1, 2)
            expect(dispatch).toBeCalledWith(3)

            const dispatch2 = jest.fn()
            mapDispatch(dispatch2, {}).bar(2, 3)
            expect(dispatch2).toBeCalledWith(6)
        })
    })
})
