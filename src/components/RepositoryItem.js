import React from 'react';

export default function RepositoryItem({title, children}){
    return (
    <li>{title}{children}</li>
    );
}