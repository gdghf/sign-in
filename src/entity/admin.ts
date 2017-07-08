import { Entity, Column, PrimaryColumn } from "typeorm";

//管理员模型
@Entity("admin")
export class Admin {

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
}