import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";
import { Recipe } from "./Recipe";

@Entity({ name: "category" })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Recipe, (recipe: Recipe) => recipe.category)
  recipes: Recipe[];
}
