
import React from 'react';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export const MarkdownContent: React.FC<MarkdownContentProps> = ({ 
  content,
  className = ""
}) => {
  const renderMarkdown = (text: string) => {
    return text.split('\n\n').map((paragraph, i) => {
      // Check if this is a header (starts with #)
      if (paragraph.startsWith('#')) {
        const headerMatch = paragraph.match(/^(#+)\s+(.+)$/);
        if (headerMatch) {
          const level = headerMatch[1].length; // Number of # symbols
          const content = headerMatch[2];
          
          switch (level) {
            case 1:
              return <h1 key={i} className="text-3xl font-bold mt-6 mb-3">{content}</h1>;
            case 2:
              return <h2 key={i} className="text-2xl font-bold mt-5 mb-3">{content}</h2>;
            case 3:
              return <h3 key={i} className="text-xl font-bold mt-4 mb-2">{content}</h3>;
            default:
              return <h4 key={i} className="text-lg font-bold mt-3 mb-2">{content}</h4>;
          }
        }
      }
      
      // Check if this is a list
      if (paragraph.match(/^(\d+\.|-)/) || paragraph.match(/^\s+\*/)) {
        return (
          <ul key={i} className="list-disc pl-6 space-y-2 my-4">
            {paragraph.split('\n').map((item, j) => {
              // Replace markdown bold with HTML bold
              const formattedItem = item.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
              return <li key={j} dangerouslySetInnerHTML={{ __html: formattedItem }} />;
            })}
          </ul>
        );
      }
      
      // Regular paragraph with bold text support
      const formattedParagraph = paragraph.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      return <p key={i} className="my-4" dangerouslySetInnerHTML={{ __html: formattedParagraph }} />;
    });
  };

  return (
    <div className={`prose max-w-none ${className}`}>
      {renderMarkdown(content)}
    </div>
  );
};
