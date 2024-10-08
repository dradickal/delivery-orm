import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { ServiceLabel } from '../modules/common/service.label.entity.js';

export class ServiceLabelSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    const service1 = em.create(ServiceLabel, { name: "Grubhub" });
    const service2 = em.create(ServiceLabel, { name: "Doordash" });
  }

}
