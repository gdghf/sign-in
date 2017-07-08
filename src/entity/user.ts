import { Entity, Column, PrimaryColumn } from "typeorm";

//用户模型
@Entity("user")
export class User {

    //主键
    @PrimaryColumn('nvarchar', { length: 50, nullable: false })
    Id: string;

    //用户名
    @Column('nvarchar', { length: 50 })
    UserName: string;

    //昵称
    @Column('nvarchar', { length: 50 })
    DisplayName: string;

    //密码
    @Column('nvarchar', { length: 50 })
    Password: string;

    //创建时间
    @Column('datetime')
    DateCreated: Date;

    //性别
    @Column('tinyint')
    Sex: boolean;

    //年龄
    @Column('int')
    Age: number;

    //手机号
    @Column('nvarchar', { length: 11 })
    Mobile: string;

    //高校名称
    @Column('nvarchar', { length: 50 })
    School: string;

    //企业名称
    @Column('nvarchar', { length: 50 })
    CompanyName: string;

    //企业职务
    @Column('nvarchar', { length: 50 })
    CompanyTitle: string;

    //企业位置
    @Column('nvarchar', { length: 200 })
    CompanyLocation: string;

    @Column('nvarchar', { length: 255 })
    Avatar: string;
}