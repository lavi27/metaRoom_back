import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity('user')
export default class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    name: string;

    @Column({ type: "varchar" })
    pw: string;

    @Column({ type: "int4" })
    button: number;

    @Column({ type: "int4" })
    skin: number;
}