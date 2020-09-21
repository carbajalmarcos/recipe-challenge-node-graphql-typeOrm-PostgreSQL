import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";
import { Category } from "./Category";
import { User } from "./User";

@Entity({ name: "recipe" })
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  ingredients: string;

  @ManyToOne(() => Category, (category: Category) => category.recipes)
  category: Category;

  @ManyToOne(() => User, (user: User) => user.recipes)
  user: User;
}
