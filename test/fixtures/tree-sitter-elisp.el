;;; tree-sitter-elisp.el --- Demo -*- lexical-binding: t; -*-

(defun demo-greet (name)
  "Return a greeting for NAME."
  (format "Hello, %s!" name))

(let ((names '("world" "emacs")))
  (dolist (name names)
    (message "%s" (demo-greet name))))

(provide 'tree-sitter-elisp)
