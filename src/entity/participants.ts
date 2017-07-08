import { Entity, Column, PrimaryColumn } from "typeorm";

//参与人模型
@Entity("participants")
export class Participants {

    //主键
    @PrimaryColumn('nvarchar', { length: 50, nullable: false })
    Id: string;

    //用户ID
    @Column('nvarchar', { length: 50 })
    UserId: string;

    //活动ID
    @Column('nvarchar', { length: 50 })
    ActivityId: string;

    //报名来源
    @Column('int')
    Source: number;

    //创建时间
    @Column('datetime')
    DateCreated: Date;
}

export enum Source {
    'Google Plus' = 0,
    'Sina Weibo' = 1,
    'QQ' = 2,
    'ZhiHu' = 3,
    'WeChat' = 4
}