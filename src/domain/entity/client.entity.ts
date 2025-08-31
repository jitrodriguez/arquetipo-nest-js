import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('client')
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column({ type: 'varchar', length: 50, nullable: false })
  email: string;
  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_creacion: Date;
  @UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fecha_actualizacion: Date;
  @Column({ type: 'integer', nullable: true })
  offset: number;
  @Column({ type: 'integer', nullable: true })
  prioridad: number;
  constructor(dataClient?: any) {
    super();
    if (dataClient) {
      this.id = dataClient['id'];
      this.email = dataClient['email'];
      this.offset = dataClient['offset'];
      this.prioridad = dataClient['prioridad'];
      this.fecha_creacion = new Date(dataClient['fecha_creacion']);
      this.fecha_actualizacion = new Date(dataClient['fecha_actualizacion']);
    }
  }
}
