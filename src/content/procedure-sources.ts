/** Fuentes educativas consultadas el 2026-10-02; no representan afiliaciones del doctor. */
export interface ProcedureSource {
  title: string
  url: string
}
export const procedureSources: Record<string, ProcedureSource[]> = {
  'lipoescultura-vaser': [
    {
      title: 'ASPS · Información del procedimiento',
      url: 'https://www.plasticsurgery.org/cosmetic-procedures/liposuction'
    },
    {
      title: 'ASPS · Candidatos y valoración',
      url: 'https://www.plasticsurgery.org/cosmetic-procedures/liposuction/candidates'
    },
    {
      title: 'ASPS · Preparación',
      url: 'https://www.plasticsurgery.org/cosmetic-procedures/liposuction/preparation'
    },
    {
      title: 'ASPS · Recuperación',
      url: 'https://www.plasticsurgery.org/cosmetic-procedures/liposuction/recovery'
    },
    {
      title: 'ASPS · Riesgos y seguridad',
      url: 'https://www.plasticsurgery.org/cosmetic-procedures/liposuction/safety'
    },
    {
      title: 'VASER · Información del fabricante',
      url: 'https://www.vaser.com/'
    },
    {
      title: 'MicroAire · Información sobre PAL',
      url: 'https://www.microaire.com/wp-content/uploads/2016/11/LIT-PAL-PATIENT-Rev-A.pdf'
    }
  ],
  abdominoplastia: [
    {
      title: 'ASPS · Información del procedimiento',
      url: 'https://www.plasticsurgery.org/cosmetic-procedures/tummy-tuck'
    },
    {
      title: 'ASPS · Candidatos y valoración',
      url: 'https://www.plasticsurgery.org/cosmetic-procedures/tummy-tuck/candidates'
    },
    {
      title: 'ASPS · Preparación',
      url: 'https://www.plasticsurgery.org/cosmetic-procedures/tummy-tuck/preparation'
    },
    {
      title: 'ASPS · Recuperación',
      url: 'https://www.plasticsurgery.org/cosmetic-procedures/tummy-tuck/recovery'
    },
    {
      title: 'ASPS · Riesgos y seguridad',
      url: 'https://www.plasticsurgery.org/cosmetic-procedures/tummy-tuck/safety'
    },
    {
      title: 'ASPS · Body Lift y contorno circunferencial',
      url: 'https://www.plasticsurgery.org/cosmetic-procedures/body-lift'
    },
    {
      title: 'ASPS · Alternativas de cirugía abdominal',
      url: 'https://www.plasticsurgery.org/news/articles/theres-more-than-one-type-of-tummy-tuck'
    },
    {
      title: 'Publicación médica · Abdominoplastia en Flor de Lis',
      url: 'https://pubmed.ncbi.nlm.nih.gov/3158172/'
    }
  ],
  'aumento-mamario': [
    {
      title: 'ASPS · Información del procedimiento',
      url: 'https://www.plasticsurgery.org/cosmetic-procedures/breast-augmentation'
    },
    {
      title: 'ASPS · Candidatos y valoración',
      url: 'https://www.plasticsurgery.org/cosmetic-procedures/breast-augmentation/candidates'
    },
    {
      title: 'ASPS · Preparación',
      url: 'https://www.plasticsurgery.org/cosmetic-procedures/breast-augmentation/preparation'
    },
    {
      title: 'ASPS · Recuperación',
      url: 'https://www.plasticsurgery.org/cosmetic-procedures/breast-augmentation/recovery'
    },
    {
      title: 'ASPS · Riesgos y seguridad',
      url: 'https://www.plasticsurgery.org/cosmetic-procedures/breast-augmentation/safety'
    },
    {
      title: 'FDA · Riesgos y controles de los implantes',
      url: 'https://www.fda.gov/medical-devices/breast-implants/risks-and-complications-breast-implants'
    }
  ],
  mastopexia: [
    {
      title: 'ASPS · Mastopexia y lactancia',
      url: 'https://www.plasticsurgery.org/news/blog/common-myths-about-breast-lifts-debunked'
    },
    {
      title: 'ASPS · Información del procedimiento',
      url: 'https://www.plasticsurgery.org/cosmetic-procedures/breast-lift'
    },
    {
      title: 'ASPS · Candidatos y valoración',
      url: 'https://www.plasticsurgery.org/cosmetic-procedures/breast-lift/candidates'
    },
    {
      title: 'ASPS · Preparación',
      url: 'https://www.plasticsurgery.org/cosmetic-procedures/breast-lift/preparation'
    },
    {
      title: 'ASPS · Recuperación',
      url: 'https://www.plasticsurgery.org/cosmetic-procedures/breast-lift/recovery'
    },
    {
      title: 'ASPS · Riesgos y seguridad',
      url: 'https://www.plasticsurgery.org/cosmetic-procedures/breast-lift/safety'
    }
  ],
  'reduccion-mamaria': [
    {
      title: 'ASPS · Información del procedimiento',
      url: 'https://www.plasticsurgery.org/reconstructive-procedures/breast-reduction'
    },
    {
      title: 'ASPS · Candidatos y valoración',
      url: 'https://www.plasticsurgery.org/reconstructive-procedures/breast-reduction/candidates'
    },
    {
      title: 'ASPS · Preparación',
      url: 'https://www.plasticsurgery.org/reconstructive-procedures/breast-reduction/preparation'
    },
    {
      title: 'ASPS · Recuperación',
      url: 'https://www.plasticsurgery.org/reconstructive-procedures/breast-reduction/recovery'
    },
    {
      title: 'ASPS · Riesgos y seguridad',
      url: 'https://www.plasticsurgery.org/reconstructive-procedures/breast-reduction/safety'
    }
  ],
  'transferencia-grasa-glutea': [
    {
      title: 'ASPS · Información del procedimiento',
      url: 'https://www.plasticsurgery.org/cosmetic-procedures/buttock-enhancement'
    },
    {
      title: 'ASPS · Candidatos y valoración',
      url: 'https://www.plasticsurgery.org/cosmetic-procedures/buttock-enhancement/candidates'
    },
    {
      title: 'ASPS · Preparación',
      url: 'https://www.plasticsurgery.org/cosmetic-procedures/buttock-enhancement/preparation'
    },
    {
      title: 'ASPS · Recuperación',
      url: 'https://www.plasticsurgery.org/cosmetic-procedures/buttock-enhancement/recovery'
    },
    {
      title: 'ASPS · Riesgos y seguridad',
      url: 'https://www.plasticsurgery.org/cosmetic-procedures/buttock-enhancement/safety'
    },
    {
      title: 'ASPS y sociedades científicas · Seguridad del injerto glúteo',
      url: 'https://www.plasticsurgery.org/for-medical-professionals/publications/psn-extra/news/gluteal-fat-grafting-a-joint-safety-statement'
    }
  ],
  'retraccion-de-piel': [
    {
      title: 'Tentrek · Retraction: tecnología y aplicaciones',
      url: 'https://retractionworld.com/wp-content/uploads/2024/10/Brochure-RETRACTION-V2024-Es.pdf'
    },
    {
      title: 'ASPS · Riesgos de la liposucción asociada',
      url: 'https://www.plasticsurgery.org/cosmetic-procedures/liposuction/safety'
    }
  ],
  rinoplastia: [
    {
      title: 'ASPS · Información del procedimiento',
      url: 'https://www.plasticsurgery.org/cosmetic-procedures/rhinoplasty'
    },
    {
      title: 'ASPS · Candidatos y valoración',
      url: 'https://www.plasticsurgery.org/cosmetic-procedures/rhinoplasty/candidates'
    },
    {
      title: 'ASPS · Preparación',
      url: 'https://www.plasticsurgery.org/cosmetic-procedures/rhinoplasty/preparation'
    },
    {
      title: 'ASPS · Recuperación',
      url: 'https://www.plasticsurgery.org/cosmetic-procedures/rhinoplasty/recovery'
    },
    {
      title: 'ASPS · Riesgos y seguridad',
      url: 'https://www.plasticsurgery.org/cosmetic-procedures/rhinoplasty/safety'
    }
  ],
  blefaroplastia: [
    {
      title: 'ASPS · Información del procedimiento',
      url: 'https://www.plasticsurgery.org/cosmetic-procedures/eyelid-surgery'
    },
    {
      title: 'ASPS · Candidatos y valoración',
      url: 'https://www.plasticsurgery.org/cosmetic-procedures/eyelid-surgery/candidates'
    },
    {
      title: 'ASPS · Preparación',
      url: 'https://www.plasticsurgery.org/cosmetic-procedures/eyelid-surgery/preparation'
    },
    {
      title: 'ASPS · Recuperación',
      url: 'https://www.plasticsurgery.org/cosmetic-procedures/eyelid-surgery/recovery'
    },
    {
      title: 'ASPS · Riesgos y seguridad',
      url: 'https://www.plasticsurgery.org/cosmetic-procedures/eyelid-surgery/safety'
    }
  ],
  'recuperacion-posoperatoria': [
    {
      title: 'NHS · Recuperación tras liposucción',
      url: 'https://www.nhs.uk/tests-and-treatments/cosmetic-procedures/cosmetic-surgery/liposuction/'
    },
    {
      title: 'ASPS · Recuperación tras aumento mamario',
      url: 'https://www.plasticsurgery.org/cosmetic-procedures/breast-augmentation/recovery'
    },
    {
      title: 'ASPS · Recuperación y señales de alarma',
      url: 'https://www.plasticsurgery.org/cosmetic-procedures/buttock-enhancement/recovery'
    },
    {
      title: 'Mayo Clinic · Oxigenoterapia hiperbárica',
      url: 'https://www.mayoclinic.org/tests-procedures/hyperbaric-oxygen-therapy/about/pac-20394380'
    },
    {
      title: 'FDA · Uso supervisado de la oxigenoterapia hiperbárica',
      url: 'https://www.fda.gov/medical-devices/letters-health-care-providers/follow-instructions-safe-use-hyperbaric-oxygen-therapy-devices-letter-health-care-providers'
    },
    {
      title: 'Tentrek · Tecnología de radiofrecuencia',
      url: 'https://tentreklasers.com/'
    },
    {
      title: 'FDA · Consideraciones sobre radiofrecuencia externa',
      url: 'https://www.fda.gov/medical-devices/aesthetic-cosmetic-devices/non-invasive-body-contouring-technologies'
    }
  ]
}
