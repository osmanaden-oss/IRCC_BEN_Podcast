import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { BlogPost } from '../types';
import { useTranslation } from '../hooks/useTranslation';

export const Blog = () => {
    const { t } = useTranslation();
    const { data: posts, isLoading } = useQuery({
        queryKey: ['blog'],
        queryFn: async () => {
            const { data } = await supabase.from('blog_posts').select('*');
            return data as BlogPost[];
        }
    });

    return (
        <div className="min-h-[60vh]">
             <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">{t('blog.title')}</h1>
                <p className="text-ben-sand">{t('blog.subtitle')}</p>
            </div>
            
            <div className="glass-panel p-12 rounded-2xl text-center border-dashed border-2 border-ben-brown/30">
                <p className="text-xl text-ben-gold mb-2">{t('blog.coming_soon')}</p>
                <p className="text-ben-sand">{t('blog.description')}</p>
            </div>
        </div>
    );
};
