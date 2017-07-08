import { Entity, Column, PrimaryColumn } from "typeorm";

//活动模型
@Entity("activity")
export class Activity {

    //主键
    @PrimaryColumn('nvarchar', { length: 50, nullable: false })
    Id: string;

    //标题
    @Column('nvarchar', { length: 100 })
    Title: string;

    //描述
    @Column('nvarchar', { length: 2000 })
    Description: string;

    //开始时间
    @Column('datetime')
    DateStart: Date;

    //结束时间
    @Column('datetime')
    DateEnd: Date;

    //创建时间
    @Column('datetime')
    DateCreated: Date;

    //嘉宾（多个嘉宾逗号分隔）
    @Column('nvarchar', { length: 200 })
    Guests: string;

    //活动地址
    @Column('nvarchar', { length: 200 })
    Location: string;
}