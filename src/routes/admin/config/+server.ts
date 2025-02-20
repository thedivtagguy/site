import { config } from '$lib/cms/config';
import type { RequestHandler } from './$types';
import yaml from 'js-yaml';

export const GET: RequestHandler = async () => {
  return new Response(yaml.dump(config), {
    headers: {
      'Content-Type': 'text/yaml'
    }
  });
};
