import { getRepository, Column, ColumnOptions } from "typeorm";

export function RelationColumn(options?: ColumnOptions) {
    return Column({ nullable: true, ...options });
}