import { Common } from 'src/common/entities/common.entity';
import { Column, Entity } from 'typeorm';

type UserRole = 'client' | 'owner' | 'delivery';

@Entity()
export class User extends Common {
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  role: UserRole;
}
