'use client';

import { createTsForm } from '@ts-react/form';
import { z } from 'zod';

import { FormElementText } from './FormElementText';

const mapping = [[z.string(), FormElementText]] as const;

export const BaseForm = createTsForm(mapping);

export default BaseForm;
