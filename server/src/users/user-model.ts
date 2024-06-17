import {Column, DataType, Model, Table} from 'sequelize-typescript';
import {ApiProperty} from '@nestjs/swagger';


interface UserCreationAttrs {
    password: string,
    email: string;

}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: '1', description: 'Unique identifier'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'user1', description: 'Username'})
    @Column({type: DataType.STRING,unique: true, allowNull: false})
    username: string;

    @ApiProperty({example: 'password', description: 'Password'})
    @Column({type: DataType.STRING, unique: false, allowNull: false})
    password: string;

}


