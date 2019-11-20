/// <reference path="./datalog.d.ts" />
/// <reference path="./utils/store.d.ts" />
/// <reference path="./utils/types.d.ts" />
/// <reference path="./utils/actions.d.ts" />

declare module "*.css" {
    const content: any
    export default content
}

declare module "*.scss" {
    const content: any
    export default content
}

import "styled-components"
declare module "styled-components" {
    export interface DefaultTheme {
        primary: string
        primaryBg: string
        contentMaxWidth: string
        iconSize: string
    }
}
