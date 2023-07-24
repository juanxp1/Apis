import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('pago_pse')
export class Payment {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column()
  parque_id: number;

  @Column()
  servicio_id: number;

  @Column()
  identificacion: number;

  @Column()
  tipo_identificacion: number;

  @Column()
  codigo_pago: string;

  @Column()
  id_transaccion_pse: string;

  @Column()
  tipo_persona: string;

  @Column()
  razon_social: string;

  @Column()
  codigo_verificacion: number;

  @Column()
  email: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  telefono: string;

  @Column()
  direccion: string;

  @Column()
  estado_id: number;

  @Column()
  estado_banco: string;

  @Column()
  email_pagador: string;

  @Column()
  nombre_pagador: string;

  @Column()
  apellido_pagador: string;

  @Column()
  telefono_pagador: string;

  @Column()
  direccion_pagador: string;

  @Column()
  tipo_persona_pagador: string;

  @Column()
  razon_social_pagador: string;

  @Column()
  identificacion_pagador: number;

  @Column()
  tipo_identificacion_pagador: number;

  @Column()
  codigo_banco_seleccionado: string;
  @Column()
  concepto: string;

  @Column()
  moneda: string;

  @Column()
  total: number;

  @Column()
  iva: number;

  @Column()
  permiso: string;

  @Column()
  tipo_permiso: string;

  @Column()
  id_reserva: number;

  @Column()
  fecha_pago: string;

  @Column()
  user_id_pse: string;

  @Column()
  medio_id: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at?: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at?: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: null,
  })
  deleted_at?: Date;
}
